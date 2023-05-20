const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}