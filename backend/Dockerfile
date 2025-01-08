FROM python:3.9-slim

# Create app directory
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt requirements.txt

# Copy the main application file to the working directory
COPY app.py app.py 

# Install Python dependencies from requirements.txt
RUN pip install -r requirements.txt

# Set the default command to run the application
CMD ["python", "app.py"]
