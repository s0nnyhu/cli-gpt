import openai from './config/open-ai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'
import ora from 'ora';
import cliSpinners from 'cli-spinners';

// Create a new spinner instance
const spinner = ora({
    text: 'Loading...',
    spinner: cliSpinners.dots12,
  });

  
async function main() {
    console.log(colors.bold.white('AI here, what\'s up ?'));

    const chatHistory = []; //Store conv history

    while(true) {
        const userInput = readlineSync.question(colors.yellow('\nYou: '));

        try {

            const messages = chatHistory.map(([role, content]) => ({role, content}))
            messages.push({role: 'user', content: userInput})

            spinner.start();
            //Call API with user input
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })

            spinner.stop()

            //Get completion text
            const completionText = completion.data.choices[0].message.content;


            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.white('\nAI: ' + completionText));
                return;
            }
            console.log(colors.white('\nAI: ' + completionText));
            
            //Update history with user input and chat response
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])

        } catch (error) {
            console.log(colors.red(error))
        }
    }
}

main();