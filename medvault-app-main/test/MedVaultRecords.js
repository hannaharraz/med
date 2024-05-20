const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("MedVaultRecords contract", function () {
  let medVaultRecords;
  let deployer;

  beforeEach(async () => {
    
    // Setup account
    [deployer] = await ethers.getSigners()

    // Deploy contract
    const MedVaultRecords = await ethers.getContractFactory("MedVaultRecords");
    medVaultRecords = await MedVaultRecords.deploy();
    await medVaultRecords.deployed();

    describe("Deployment", () => {
      it("Sets the owner", async () => {
        expect(await medVaultRecords.owner()).to.equal(deployer.address)
      })
    })

  });

  describe("Register patient", function () {
    let transaction;
    const id = "00000001";
    const name = "James Bond";
    const gender = "Male";
    const dateOfBirth = "1/1/1950";
    const imageUrl = "https://images.immediate.co.uk/production/volatile/sites/3/2021/09/daniel-craig-007.jpg-303a730.png";
    const medicalHistory = "James Bond's Medical History ...";
    const treatmentHistory = "James Bond's Treatment History ...";

    it("Should register a new patient", async () => {
      transaction = await medVaultRecords.registerPatient(id, name, gender, dateOfBirth, imageUrl, medicalHistory, treatmentHistory);

      const patient = await medVaultRecords.patients(id);
      expect(patient.id).to.equal(id);
      expect(patient.name).to.equal(name);
      expect(patient.gender).to.equal(gender);
      expect(patient.dateOfBirth).to.equal(dateOfBirth);
      expect(patient.imageUrl).to.equal(imageUrl);
      expect(patient.medicalHistory).to.equal(medicalHistory);
      expect(patient.treatmentHistory).to.equal(treatmentHistory);
    });

    it("Emits PatientRegistered event", () => {
      expect(transaction).to.emit(medVaultRecords, "PatientRegistered")
    });
  });

});
