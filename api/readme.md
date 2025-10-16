# DCCuote BackEnd

Minimal application to manage a daily quote service backend.

## Run

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
pytest -q
```

### Coverage Report

Coverage is configured via `pytest.ini` using `pytest-cov`.

- Install dependencies (if not already):

Artifacts:
- Terminal summary: shown after the test run.
- HTML report: `api/htmlcov/index.html`.