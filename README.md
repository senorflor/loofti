# Your product, by Platter

## Welcome

Thanks for joining us as an early release user! If you've made it this
far, you have:
 
- authenticated to platter.dev via GitHub
- created a Platter product
- navigated to its GitHub repository (or a local copy of it).

### What's next?

#### One-time setup:

If you haven't already done so, please:

1. Install the `platter` CLI (command line interface):
   ```bash
   curl -fsSL https://install.platter.dev | sh
   ```
1. Install Docker (Stable channel is strongly recommended):
    - [Download Docker for Mac from
      docker.com](https://download.docker.com/mac/stable/Docker.dmg)
    - [Download Docker for Windows from
      docker.com](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe)
    - <a href="https://docs.docker.com/install/#server"
      target="_blank">Install Docker for Linux (CentOS, Debian,
      Fedora, Ubuntu, or from binaries) via docker.com</a>

#### Develop this product locally

1. Clone this repository to your computer with `git`
    - If you're new to `git` and GitHub, instructions for cloning a
      repository are <a
      href="https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository"
      target="_blank">here</a>.
1. Navigate into the local folder you cloned and run `platter start`
   to develop your product locally.
    - Each component watches for changes and builds/reloads
      automatically.
    - If your app has a database, run `platter data` to see what
      commands there are for migrating your database schema.
1. Open pull requests, review them, and then merge (or just push
   changes straight to master if you're in a hurry): Platter will take
   care of deploying every changed component each time the `master`
   branch changes.
1. Use the dashboard at app.platter.dev to keep an eye on
   build/deployment status, runtime logs, and other product
   configuration and monitoring settings.

Thanks for taking the time: let us know on <a
href="https://docs.google.com/forms/d/e/1FAIpQLSdQo8eZgIsjuSOz5OBqAoTUKlQUnh6s7YmHgvibCVgmgMN0Pw/viewform"
target="_blank">our feedback form</a> or at hello@platter.dev if you
have any feedback or requests!
