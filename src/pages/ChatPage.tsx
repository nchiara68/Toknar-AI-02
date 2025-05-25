import { AIConversation} from '@aws-amplify/ui-react-ai'
import { useAIConversation } from '../AIclient';


function ChatReact() {

    const chat = useAIConversation('chat')

    const messages = chat[0].data.messages;
    const sendMessage = chat[1]

    return <main>
        <h2>Inquiry our AI engine</h2><br />
        <AIConversation
            messages={messages}
            handleSendMessage={sendMessage}
        />

    </main>
}



export default ChatReact

