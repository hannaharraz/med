import { useState } from 'react'
import { ethers } from 'ethers'

// Components
import close from '../assets/close.svg'

const Patient = ({ patient, provider, account, medVaultRecords, togglePop }) => {
  const [hasMedicalRecord, setHasMedicalRecord] = useState(false)

  const addMedicalRecordHandler = async () => {
    //const signer = await provider.getSigner()

    // Add Medical Record...
    //let transaction = await medVaultRecords.connect(signer).addMedicalRecord(patient.id, account)
    //await transaction.wait()
    setHasMedicalRecord(true)
  }


  return (
    <div className="patient">
      <div className="patient__details">
        <div className="patient__image">
          <img src={patient.imageUrl} alt="Patient" />
        </div>
        <div className="patient__overview">
          <h1>{patient.name}</h1>
                    
          <hr />

          <h2>Patient Detail</h2>

          <p>
            <strong>Id: </strong>{patient.id}
          </p>

          <p>
            <strong>Gender: </strong>{patient.gender}
          </p>

          <p>
          <strong>Date of Birth: </strong>{patient.dateOfBirth}
          </p>

          <p>
            <strong>Medical History: </strong>{patient.medicalHistory}
          </p>

          <p>
            <strong>Treatment History: </strong>{patient.treatmentHistory}
          </p>
          
        </div>

        <div className="patient__update">
          <h1>{ethers.utils.formatUnits('200000', 'ether')} ETH</h1>

          {!hasMedicalRecord && (
            <button className='patient__addMedicalRecord' onClick={addMedicalRecordHandler}>
              Add Medical Record
            </button>
          )}

          {hasMedicalRecord && (
            <div className='patient__addedMedicalRecord'>
              Medical Record has been added
            </div>
          )}
        </div>


        <button onClick={togglePop} className="patient__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div >
  );
}

export default Patient;