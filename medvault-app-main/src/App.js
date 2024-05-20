import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Patient from './components/Patient'

// ABIs
import MedVaultRecords from './abis/MedVaultRecords.json'


// Config
import config from './config.json'

function App() {
  const [provider, setProvider] = useState(null)
  const [medVaultRecords, setMedVaultRecords] = useState(null)

  const [account, setAccount] = useState(null)

  const [males, setMales] = useState(null)
  const [females, setFemales] = useState(null)


  const [patient, setPatient] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (patient) => {
    setPatient(patient)
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    const medVaultRecords = new ethers.Contract(config[network.chainId].medVaultRecords.address, MedVaultRecords, provider)
    setMedVaultRecords(medVaultRecords)

    const patients = []
    for (var i = 0; i < config[network.chainId].ids.length; i++) {
      const patient = await medVaultRecords.patients(config[network.chainId].ids[i])
      patients.push(patient)
    }

    const males = patients.filter((patient) => patient.gender === 'Male')
    setMales(males)

    const females = patients.filter((patient) => patient.gender === 'Female')
    setFemales(females)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <section class="hero">
        <div class="hero-inner">
            <h2>MedVault</h2>
            <h3>A Blockchain-based System for Secure Storage and Communication of Medical Data</h3>
            <br/>
            <a href="#patients">
              <button type="button" className='nav__connect'>Get Started...</button>
            </a>
        </div>
      </section>


      <ul className='nav__links'>
          <li><a href="#Male">Male</a></li>
          <li><a href="#Female">Female</a></li>
      </ul>


      <h2 id="patients">Registerd Patients</h2>

      {males && females &&(
        <>
          <Section title={"Male"} patients={males} togglePop={togglePop} />
          <Section title={"Female"} patients={females} togglePop={togglePop} />
        </>
      )}

      {toggle && (
        <Patient patient={patient} provider={provider} account={account} medVaultRecords={medVaultRecords} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;
