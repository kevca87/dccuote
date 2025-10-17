# DCCuote BackEnd

Minimal application to manage a daily quote service backend.

## Run Local

To run the backend you first need to install the necessary dependencies

```
pip install -r requirements.txt
```

Then you can execute the following command inside 'api/src' to run it on localhost

```
python -m flask run
```

## Doc

You can check the endpoints doc in

[http://127.0.0.1:5000/apidocs](http://127.0.0.1:5000/apidocs)

## Tests

This project uses pytest for API tests.

- Run the test suite from the `api/` folder:

```
pytest -q -k .
```

### Running Tests in Docker

To run the tests inside the Docker container:

1. Start the container in interactive mode:

```sh
docker-compose run app sh
```

2. Inside the container, run:

```sh
pytest -q -k .
```

### Coverage Report

Coverage is configured via `pytest.ini` using `pytest-cov`.

- Generate coverage (terminal + HTML):

```sh
pytest -q -k .
```

- Extract the HTML coverage report to your local machine (Execute this outside docker):

```sh
docker cp <container_id>:/app/htmlcov ./htmlcov
```

- Exit and stop the Docker container:

```sh
docker-compose down
```

Artifacts:
- Terminal summary: shown after the test run.
- HTML report: `api/htmlcov/index.html`.

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