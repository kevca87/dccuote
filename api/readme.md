# DCCuote BackEnd

Minimal application to manage a daily quote service backend.

## Doc

You can check the endpoints doc in:

[http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

when the app is running

### Running Tests in Docker

To run the tests inside the Docker container:

1. Build the docker images

```sh
docker-compose build
```

2. Start the container in interactive mode:

```sh
docker-compose run app sh
```

2. Inside the container, run:

```sh
pytest -q -k .
```

### Coverage Report

Coverage is configured via `pytest.ini` using `pytest-cov`.

- Extract the HTML coverage report to your local machine (Execute this outside docker):

```sh
docker cp <container_id>:/app/htmlcov ./htmlcov
```

- Stop the Docker container:

```sh
docker-compose down
```

Artifacts:
- Terminal summary: shown after the test run.
- HTML report: `htmlcov/index.html`.

## Docker

To run the application using Docker:

1. Build the Docker image:

```sh
docker-compose build
```

2. Run the container:

```sh
docker-compose up
```

3. Stop and remove the container:

```sh
docker-compose down
```

The application will be available at `http://127.0.0.1:5000`.