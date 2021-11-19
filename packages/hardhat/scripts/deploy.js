async function main() {
  // We get the contract to deploy
  const Poster = await ethers.getContractFactory("Poster");
  const poster = await Poster.deploy();

  console.log("Poster deployed to:", poster.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
