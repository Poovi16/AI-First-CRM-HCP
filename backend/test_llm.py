from agent import llm

response = llm.invoke("Say only: Hello from Groq")

print(response.content)