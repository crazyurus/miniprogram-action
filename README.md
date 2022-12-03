# WeChat MiniProgram GitHub Action

A [GitHub Action](https://github.com/features/actions) to automate deploying WeChat MiniProgram by using [miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci).

It will enable workflows to easily preview and upload your MiniProgram to the WeChat.

The implementation of preview or upload is the same as VSCode extension [miniprogram-vscode-extension](https://marketplace.visualstudio.com/items?itemName=crazyurus.miniprogram-vscode-extension).

# Usage

Here's an example workflow which publishes an extension when you push to the master branch.

## Preview

```yaml
on:
  push:
    branches:
      - master
name: Preview MiniProgram
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: crazyurus/miniprogram-action@1.0.0
        with:
          action_type: preview
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
```

## Upload

```yaml
on:
  release:
    types:
      - created
name: Upload MiniProgram
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: crazyurus/miniprogram-action@1.0.0
        with:
          action_type: upload
          version: 1.0.0
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
```

# Secrets

The `PRIVATE_KEY` secret is used to authenticate with WeChat when running the `miniprogram-ci` CLI. You can find out how to create this token here on the WeChat Developers: [CI](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)

There are mainly the following primary steps:

1. Login to https://mp.weixin.qq.com
2. Find "开发" - "开发设置" - "小程序代码上传"
3. Generate private key and download key file, and **close IP whitelist**
4. Copy the contents of the key file and add in GitHub repository settings. Find "Settings" - "Secrets" - "Actions", and click "New repository secret" button. Enter the "Name" as `PRIVATE_KEY`, and "Secret" as the contents of the key file

# Example Use Cases

- Preview MiniProgram if the `master` branch has changed since the last build.
- Upload MiniProgram when creating a release version on GitHub.
