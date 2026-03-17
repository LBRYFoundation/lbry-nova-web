# LBRY Nova for Web

[![Node.js CI](https://github.com/LBRYFoundation/lbry-nova-web/actions/workflows/node.js.yml/badge.svg)](https://github.com/LBRYFoundation/lbry-nova-web/actions/workflows/node.js.yml)
[![Docker Image CI](https://github.com/LBRYFoundation/lbry-nova-web/actions/workflows/docker-image.yml/badge.svg)](https://github.com/LBRYFoundation/lbry-nova-web/actions/workflows/docker-image.yml)

The LBRY Nova interface to interact with the LBRY Daemon from in the browser.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

Installing dependencies, when not using a containerized setup:

```shell
npm install
```

## Usage

Running development server:

```shell
npm run dev
```

Build the project:

```shell
npm run build
```

Run the server:

```shell
npm run start
```

### With Docker

Building the image:

```shell
docker build . -t lbry-nova-web
```

Running the container:

```shell
docker run --name lbry-nova-web --network host --restart always lbry-nova-web
```

### With Docker Compose

```shell
docker compose build
docker compose up -d
```

## License

This project is MIT licensed. For the full license, see [LICENSE](LICENSE.md).
