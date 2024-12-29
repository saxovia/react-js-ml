import { useState, useRef, useEffect } from 'react'
import HomePage from '../components/HomePage'
import Header from '../components/Header'
import Transcribing from '../components/Transcribing'
import Information from '../components/Information'
import FileDisplay from '../components/FileDisplay'
import './index.css';
import { MessageTypes } from './utils/presets'


function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)
  const [downloading, setDownloading] = useState(false)

  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  }

  const worker = useRef(null)

  const isAudioAvailable = file || audioStream
  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url), { type: 'module' })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          setDownloading(true)
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          setLoading(true)
          console.log('LOADING')
          break;
        case 'RESULT':
          setOutput(e.data.results)
          console.log(e.data.results)
          break;
        case 'INFERENCE_DONE':
          setFinished(true)
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  
  async function readAudioFrom(file) {
    try {
      const sampling_rate = 16000;
      const audioCTX = new AudioContext({ sampleRate: sampling_rate });
      const response = await file.arrayBuffer();
      const decoded = await audioCTX.decodeAudioData(response);
      const audio = decoded.getChannelData(0);
      return audio;
    } catch (error) {
      console.error("Failed to decode audio data:", error);
      throw new Error("Unsupported or corrupted audio file.");
    }
  }
  
  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    let audio = await readAudioFrom(file ? file : audioStream)
    const model_name = `openai/whisper-tiny.en`
    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {output ? (<Information />) : loading ? (<Transcribing />) : isAudioAvailable ? (
          <FileDisplay handleFormSubmission={handleFormSubmission} handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream} />) : (<HomePage setFile={setFile} setAudioStream={setAudioStream} />)}
      </section>
      <h1 className="text-green-400">Hello</h1>
      <footer></footer>
    </div>
  )
}

export default App
