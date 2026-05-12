import requests

LM_STUDIO_URL = "http://127.0.0.1:1234/v1/chat/completions"
MODEL_NAME = "local-model" 


def generate_answer(context, question):
    try:
        response = requests.post(
            LM_STUDIO_URL,
            json={
                "model": "mistral-7b-instruct-v0.2",
                "messages": [
                    {
                        "role": "user",
                        "content": f"Answer ONLY using the context below.\n\nContext:\n{context}\n\nQuestion:\n{question}"
                    }
                ]
                }
            
        )

        data = response.json()

        return data['choices'][0]['message']['content']

    except Exception as e:
        return f"Error generating response: {str(e)}"
    
def generate_summary(context):
    try:
        response = requests.post(
            LM_STUDIO_URL,
            json={
                "model": "mistral-7b-instruct-v0.2",
                "messages": [
                    {
                        "role": "user",
                        "content": f"Answer ONLY using the context below.\n\nContext:\n{context}"
                    }
                ]
                }
        )

        data = response.json()

        return data['choices'][0]['message']['content']

    except Exception as e:
        return f"Error generating response: {str(e)}"
    
def generate_genre(context):
    try:
        response = requests.post(
            LM_STUDIO_URL,
            json={
                "model": "mistral-7b-instruct-v0.2",
                "messages": [
                    {
                        "role": "user",
                        "content": f"Answer ONLY using the context below.\n\nContext:\n{context}"
                    }
                ]
                }
        )

        data = response.json()

        return data['choices'][0]['message']['content']

    except Exception as e:
        return f"Error generating response: {str(e)}"
