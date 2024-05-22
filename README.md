# Kompare Insurance


### Prerequisites

Ensure that you have Docker installed on your machine. For installation instructions, visit [Docker's official website](https://docs.docker.com/get-docker/).

## Installation and running

Clone the project

```bash
git clone https://github.com/Realman78/kompare-insurance.git
```
Position yourself in the directory of the project

```bash
cd kompare-insurance
```
Run the make command

```bash
make launch
```
Navigate to *http://localhost:8080/*

## Testing
```bash
npm run test
```

## Troubleshooting
If, for some reason, you dont see any coverages or discounts, navigate to '/api/repopulate'. Now, everything should be populated and you can return to '/'. **This is just a precaution. Everything should work.**