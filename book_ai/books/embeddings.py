from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

def get_embedding(description):
    return model.encode(description)

# text = 'Atomic Habits is about discipline'
# print(get_embedding(text))