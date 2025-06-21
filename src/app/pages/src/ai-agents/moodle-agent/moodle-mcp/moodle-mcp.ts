import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Server, Shield, Settings } from "lucide-angular";

@Component({
  selector: "app-moodle-mcp",
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./moodle-mcp.html",
  styleUrl: "./moodle-mcp.scss",
})
export class MoodleMcp {
  readonly ServerIcon = Server;
  readonly ShieldIcon = Shield;
  readonly SettingsIcon = Settings;

  codeExample = `# MoodleMcp.py
import asyncio
import json
from typing import Dict, List, Optional, Any
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
class MoodleMcp:
    def __init__(self, moodle_url: str, token: str):
        self.moodle_url = moodle_url
        self.token = token
        self.session: Optional[ClientSession] = None
        
    async def initialize_mcp_server(self):
        """Initialize MCP server connection"""
        server_params = StdioServerParameters(
            command="python",
            args=["-m", "moodle_mcp_server"],
            env={"MOODLE_URL": self.moodle_url, "MOODLE_TOKEN": self.token}
        )
        
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                self.session = session
                await session.initialize()
                
                # List available tools
                tools = await session.list_tools()
                print(f"Available MCP tools: {[tool.name for tool in tools.tools]}")
                
                return session
    
    async def call_moodle_tool(self, tool_name: str, arguments: Dict[str, Any]) -> Dict:
        """Call a Moodle MCP tool"""
        if not self.session:
            raise RuntimeError("MCP session not initialized")
            
        result = await self.session.call_tool(tool_name, arguments)
        return result.content
    
    async def get_course_info(self, course_id: int) -> Dict:
        """Get course information via MCP"""
        return await self.call_moodle_tool("get_course_info", {"course_id": course_id})
    
    async def enroll_user(self, user_id: int, course_id: int, role_id: int = 5) -> Dict:
        """Enroll user in course via MCP"""
        return await self.call_moodle_tool("enroll_user", {
            "user_id": user_id,
            "course_id": course_id,
            "role_id": role_id
        })
    
    async def create_assignment(self, course_id: int, assignment_data: Dict) -> Dict:
        """Create assignment via MCP"""
        return await self.call_moodle_tool("create_assignment", {
            "course_id": course_id,
            **assignment_data
        })
# Example usage
async def main():
    mcp = MoodleMcp("https://your-moodle.com", "your-token")
    
    async with mcp.initialize_mcp_server() as session:
        # Get course information
        course_info = await mcp.get_course_info(1)
        print(f"Course info: {course_info}")
        
        # Enroll a user
        enrollment = await mcp.enroll_user(123, 1)
        print(f"Enrollment result: {enrollment}")
if __name__ == "__main__":
    asyncio.run(main())`;

  mcpFeatures = [
    {
      title: "Server Communication",
      description: "Async communication with MCP servers",
      status: "active",
    },
    {
      title: "Tool Discovery",
      description: "Automatic discovery of available Moodle tools",
      status: "active",
    },
    {
      title: "Secure Authentication",
      description: "Token-based authentication with Moodle",
      status: "active",
    },
    {
      title: "Course Management",
      description: "Create, update, and manage courses",
      status: "pending",
    },
    {
      title: "User Enrollment",
      description: "Automated user enrollment processes",
      status: "pending",
    },
  ];
}
