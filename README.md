<h1 align="center">GitLab Roadmap</h1>

<p align="center">
<a href="https://github.com/Filiosoft/gitlab-roadmap/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Filiosoft/gitlab-roadmap.svg" alt="GitHub license"></a>
<a href="https://travis-ci.com/Filiosoft/gitlab-roadmap"><img src="https://travis-ci.com/Filiosoft/gitlab-roadmap.svg?branch=develop" alt="Build Status"></a>
<a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" alt="Commitizen friendly"></a>
<a href="https://standardjs.com"><img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" alt="JavaScript Style Guide"></a>
<a href="https://github.com/semantic-release/semantic-release"><img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="semantic-release"></a>

</p>
<p align="center"><b>📢 Create a product roadmap website with GitLab Issue Boards as a backend!</b></p>

## Setup

### Quick Start (Heroku)

Click the button below to deploy on Heroku!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Filiosoft/gitlab-roadmap)

### Slower Start (AWS Lambda)

If you want to deploy to AWS Lambda, follow the steps below:

Clone the repository

```
$ git clone https://github.com/Filiosoft/gitlab-roadmap
```

Install the dependencies

```
$ npm install
```

Copy `config.example.yml` to `config.yml` and edit it to your liking

```
$ cp config.example.yml config.yml
```

Setup the domain (see [here](https://github.com/amplify-education/serverless-domain-manager) for more instructions)

```
$ npx sls create_domain
```

And finally, deploy

```
$ npx sls deploy
```

### Development Setup

Want to contribute? Awesome! Follow these steps to get setup.

Clone the repository

```
$ git clone https://github.com/Filiosoft/gitlab-roadmap
```

Install the dependencies

```
$ npm install
```

Copy `example.env` to `.env` and edit it to your liking

```
$ cp example.env .env
```

Start the dev server

```
$ npm run dev
```

## Versioning

We use [semantic-release](https://github.com/semantic-release/semantic-release) for versioning. Every commit to `master` will generate a release. For the versions available, see the [releases on the repositories](https://github.com/Filiosoft/gitlab-roadmap/releases).

## Credits

- **Noah Prail** - _Project Lead_ - [@nprail](https://github.com/nprail)

See also the list of [contributors](https://github.com/Filiosoft/gitlab-roadmap/contributors) who participated in this project.

## License

[MIT](https://github.com/Filiosoft/gitlab-roadmap/blob/develop/LICENSE)
