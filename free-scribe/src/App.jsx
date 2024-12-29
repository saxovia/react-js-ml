import { useState, useEffect } from 'react'
import HomePage from '../components/HomePage'
import Header from '../components/Header'
import Transcribing from '../components/Transcribing'
import Information from '../components/Information'
import FileDisplay from '../components/FileDisplay'
import './index.css';


function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  }


  const isAudioAvailable = file || audioStream
  return (
    <div className='flex flex-col max-w-[1000px] mx-auto w-full'>
      <section className='min-h-screen flex flex-col'>
        <Header />
        {output ? (<Information/>) : loading ? (<Transcribing/>) : isAudioAvailable ? (
          <FileDisplay handleAudioReset={handleAudioReset} file={file} audioStream={setAudioStream} />) : (<HomePage setFile={setFile} setAudioStream={setAudioStream} />)}
      </section>
      <h1 className="text-green-400">Hello</h1>
      <footer></footer>
    </div>
  )
}

export default App
