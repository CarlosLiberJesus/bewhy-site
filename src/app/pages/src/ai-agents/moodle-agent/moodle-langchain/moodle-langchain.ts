import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Link, Database, Zap } from "lucide-angular";
import { Subject, takeUntil } from "rxjs";
import { ThemeService } from "../../../../../services/theme-service";

@Component({
  selector: "app-moodle-langchain",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./moodle-langchain.html",
  styleUrl: "./moodle-langchain.scss",
})
export class MoodleLangChain implements OnInit, OnDestroy {
  readonly LinkIcon = Link;
  readonly DatabaseIcon = Database;
  readonly ZapIcon = Zap;

  codeExample = `# MoodleLangChain.py
from langchain.llms import OpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts import PromptTemplate
import requests
from typing import Dict, List, Optional
class MoodleLangChain:
    def __init__(self, moodle_url: str, token: str, openai_key: str):
        self.moodle_url = moodle_url
        self.token = token
        self.llm = OpenAI(openai_api_key=openai_key)
        self.memory = ConversationBufferMemory()
        
        # Custom prompt for Moodle context
        self.prompt = PromptTemplate(
            input_variables=["history", "input", "moodle_context"],
            template="""You are a helpful Moodle assistant. 
            
            Moodle Context: {moodle_context}
            
            Previous conversation:
            {history}
            
            Human: {input}
            Assistant:"""
        )
        
        self.conversation = ConversationChain(
            llm=self.llm,
            memory=self.memory,
            prompt=self.prompt,
            verbose=True
        )
    
    def get_moodle_context(self, course_id: int) -> str:
        """Fetch course context from Moodle"""
        params = {
            'wstoken': self.token,
            'wsfunction': 'core_course_get_courses_by_field',
            'moodlewsrestformat': 'json',
            'field': 'id',
            'value': course_id
        }
        
        response = requests.post(f"{self.moodle_url}/webservice/rest/server.php", data=params)
        course_data = response.json()
        
        if course_data and 'courses' in course_data:
            course = course_data['courses'][0]
            return f"Course: {course['fullname']}, Summary: {course['summary']}"
        return "No course context available"
    
    def chat_with_context(self, user_input: str, course_id: int = None) -> str:
        """Chat with LangChain using Moodle context"""
        moodle_context = ""
        if course_id:
            moodle_context = self.get_moodle_context(course_id)
        
        response = self.conversation.predict(
            input=user_input,
            moodle_context=moodle_context
        )
        
        return response`;

  features = [
    {
      icon: "LinkIcon",
      title: "LangChain Integration",
      description:
        "Seamlessly integrate with LangChain for advanced AI capabilities",
    },
    {
      icon: "DatabaseIcon",
      title: "Moodle Data Access",
      description:
        "Access course data, user information, and learning analytics",
    },
    {
      icon: "ZapIcon",
      title: "Contextual AI",
      description: "AI responses based on specific Moodle course context",
    },
  ];

  private destroy$ = new Subject<void>();
  private themeService = inject(ThemeService);
  isDarkTheme = true;

  ngOnInit() {
    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isDark) => {
        this.isDarkTheme = isDark;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
