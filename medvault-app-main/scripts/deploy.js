// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const { patients } = require("../src/patients.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts
  const [deployer] = await ethers.getSigners()

  // Deploy MedVaultRecords
  const MedVaultRecords = await ethers.getContractFactory("MedVaultRecords");
  const medVaultRecords = await MedVaultRecords.deploy()
  await medVaultRecords.deployed()

  console.log(`Deployed MedVaultRecords Contract at: ${medVaultRecords.address}\n`)

  // Register patients...
  for (let i = 0; i < patients.length; i++) {
    const transaction = await medVaultRecords.connect(deployer).registerPatient(
      patients[i].id,
      patients[i].name,
      patients[i].gender,
      patients[i].dateOfBirth,
      patients[i].imageUrl,
      patients[i].medicalHistory,
      patients[i].treatmentHistory
    )

    await transaction.wait()

    console.log(`Registered patient ${patients[i].id}: ${patients[i].name}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
