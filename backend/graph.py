from langgraph.prebuilt import create_react_agent

from agent import llm

from tools import (
    log_interaction,
    edit_interaction,
    get_hcp_profile,
    schedule_followup,
    generate_summary,
)

graph = create_react_agent(
    model=llm,
    tools=[
        log_interaction,
        edit_interaction,
        get_hcp_profile,
        schedule_followup,
        generate_summary,
    ],
)