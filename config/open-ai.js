import { Configuration, OpenAIApi} from 'openai'
import dotenv from 'dotenv'
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
    basePath: process.env.API_CHURCH
});

const openai = new OpenAIApi(configuration)

export default openai;