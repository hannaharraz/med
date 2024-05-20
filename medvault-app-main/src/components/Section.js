import { ethers } from 'ethers'

// Components

const Section = ({ title, patients, togglePop }) => {
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>

            <hr />

            <div className='cards'>
                {patients.map((patient, index) => (
                    <div className='card' key={index} onClick={() => togglePop(patient)}>
                        <div className='card__image'>
                            <img src={patient.imageUrl} alt="Patient" />
                        </div>
                        <div className='card__info'>
                            <h3>{patient.name}</h3>
                            <p> <strong>Id: </strong> {patient.id}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Section;