import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_groq import ChatGroq
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

def initialize_llm():
    """Initialize the Groq LLM."""
    llm = ChatGroq(
        temperature=0,
        groq_api_key=os.getenv("GROQ_API_KEY"),
        model_name="llama-3.3-70b-versatile"
    )
    return llm

def load_vector_db(db_path="./chroma_db"):
    """Load or initialize the ChromaDB vector store."""
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vector_db = Chroma(persist_directory=db_path, embedding_function=embeddings)
    return vector_db

def setup_qa_chain(vector_db, llm):
    """Set up the RetrievalQA chain."""
    retriever = vector_db.as_retriever()
    prompt_template = """You are a compassionate mental health chatbot named Manas. Respond thoughtfully to the following question:
    {context}
    User: {question}
    Chatbot: """
    PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
    
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs={"prompt": PROMPT}
    )
    return qa_chain

def check_keywords(query):
    """Check for serious keywords in the query."""
    keywords = ["death", "murder", "suicide", "harm", "kill"]
    return any(keyword in query.lower() for keyword in keywords)

def process_query(query, qa_chain):
    """Process a user query and return the response and warning flag."""
    greetings = ["hi", "hello", "hey"]
    if query.lower() in greetings:
        return {
            "response": "Hey there! I'm Manas, your mental health companion. Feel free to share how you're feeling today—whether it's happy, sad, anxious, or anything else. I'm here with no judgment!",
            "warning": False
        }
    
    warning = check_keywords(query)
    response = qa_chain.run(query)
    
    return {
        "response": response,
        "warning": warning
    }

def initialize():
    """Initialize all components for inference."""
    llm = initialize_llm()
    vector_db = load_vector_db()
    qa_chain = setup_qa_chain(vector_db, llm)
    return qa_chain