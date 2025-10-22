# Use the official Python image as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt ./

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the source code into the container
COPY src/ ./src

# Copy the tests folder into the container
COPY tests/ ./tests

# Copy the db folder into the container
COPY db/ ./db

# Copy the pytest configuration file into the container
COPY pytest.ini ./

# Expose the port the app runs on
EXPOSE 5000

# Set the default command to run the application
CMD ["python", "-m", "flask", "run", "--host=0.0.0.0", "--port=5000"]