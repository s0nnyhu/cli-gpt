import openai from './config/open-ai.js'
import readlineSync from 'readline-sync'
import colors from 'colors'

async function main() {
    console.log(colors.bold.green('CLI GPT here, what\'s up ?'));

    const chatHistory = []; //Store conv history

    while(true) {
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {

            const messages = chatHistory.map(([role, content]) => ({role, content}))
            messages.push({role: 'user', content: userInput})

            //Call API with user input
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages
            })

            //Get completion text
            const completionText = completion.data.choices[0].message.content;


            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.green('GPT: ' + completionText));
                return;
            }
            console.log(colors.green('GPT: ' + completionText));
            
            //Update history with user input and chat response
            chatHistory.push(['user', userInput])
            chatHistory.push(['assistant', completionText])

        } catch (error) {
            console.log(colors.red(error))
        }
    }
}

main();