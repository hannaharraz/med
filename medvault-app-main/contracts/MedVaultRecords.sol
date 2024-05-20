// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract MedVaultRecords {
   address public owner;


  // Struct to store patient information
  struct Patient {
    string id;
    string name;
    string gender;
    string dateOfBirth;
    string imageUrl;
    string medicalHistory;
    string treatmentHistory;
  }

  mapping(string => Patient) public patients;

  event PatientRegistered(string id, string patientName);

  modifier onlyOwner() {
      require(msg.sender == owner);
      _;
  }

  constructor() {
    owner = msg.sender;
  }


  // Function to register a new patient
function registerPatient(string memory id, string memory name, string memory gender, string memory dateOfBirth, string memory imageUrl, string memory medicalHistory, string memory treatmentHistory) public onlyOwner {
    Patient memory patient = Patient(id, name, gender, dateOfBirth, imageUrl, medicalHistory, treatmentHistory);
    patients[id] = patient;

    // Emit registration event
    emit PatientRegistered(id, name);
  }

}
