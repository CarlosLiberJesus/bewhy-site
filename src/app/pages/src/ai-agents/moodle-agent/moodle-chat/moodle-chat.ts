import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, MessageCircle, Bot, User } from "lucide-angular";
import { MoodleAgent } from "../moodle-agent";

@Component({
  selector: "app-moodle-chat",
  standalone: true,
  imports: [CommonModule, LucideAngularModule, MoodleAgent],
  templateUrl: "./moodle-chat.html",
  styleUrl: "./moodle-chat.scss",
})
export class MoodleChat {
  readonly MessageCircleIcon = MessageCircle;
  readonly BotIcon = Bot;
  readonly UserIcon = User;

  chatMessages = [
    {
      type: "system",
      content: "MoodleChat initialized successfully",
      timestamp: new Date(),
    },
    {
      type: "user",
      content: "How can I integrate this with Moodle?",
      timestamp: new Date(),
    },
    {
      type: "bot",
      content:
        "MoodleChat provides a seamless integration with Moodle's messaging system. You can connect it using the Moodle Web Services API.",
      timestamp: new Date(),
    },
  ];

  codeExample = `# MoodleChat.py
import requests
from typing import Dict, List, Optional
class MoodleChat:
    def __init__(self, moodle_url: str, token: str):
        self.moodle_url = moodle_url
        self.token = token
        self.api_endpoint = f"{moodle_url}/webservice/rest/server.php"
    
    def send_message(self, user_id: int, message: str) -> Dict:
        """Send a message to a Moodle user"""
        params = {
            'wstoken': self.token,
            'wsfunction': 'core_message_send_instant_messages',
            'moodlewsrestformat': 'json',
            'messages[0][touserid]': user_id,
            'messages[0][text]': message
        }
        
        response = requests.post(self.api_endpoint, data=params)
        return response.json()
    
    def get_conversations(self, user_id: int) -> List[Dict]:
        """Get user conversations from Moodle"""
        params = {
            'wstoken': self.token,
            'wsfunction': 'core_message_get_conversations',
            'moodlewsrestformat': 'json',
            'userid': user_id
        }
        
        response = requests.post(self.api_endpoint, data=params)
        return response.json()`;
}
