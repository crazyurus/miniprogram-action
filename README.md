# WeChat MiniProgram GitHub Action

> 中文使用文档 [利用 GitHub Actions 实现小程序的持续集成](https://juejin.cn/post/7173608478768889886)

A [GitHub Action](https://github.com/features/actions) to automate deploying WeChat MiniProgram by using [miniprogram-ci](https://www.npmjs.com/package/miniprogram-ci).

It will enable workflows to easily preview and upload your MiniProgram to the WeChat.

The implementation of preview or upload is the same as VSCode extension [miniprogram-vscode-extension](https://marketplace.visualstudio.com/items?itemName=crazyurus.miniprogram-vscode-extension).

# Usage

Here's an example workflow which publishes an extension when you push to the master branch.

## Preview

```yaml
name: Preview MiniProgram
on:
  push:
    branches:
      - master
jobs:
  preview:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - id: preview
        name: Compile
        uses: crazyurus/miniprogram-action@1.0.0
        with:
          action_type: preview
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
      - name: QR Code
        uses: peter-evans/commit-comment@v2
        with:
          body: |
            Copy the following content to the address bar of the browser to open the preview QR code

            ```
            ${{ steps.preview.outputs.preview_qrcode }}
            ```
```

## Upload

```yaml
name: Upload MiniProgram
on:
  push:
    tags:
      - "*.*.*"
jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Upload
        uses: crazyurus/miniprogram-action@1.0.0
        with:
          action_type: upload
          version: ${{ github.ref_name }}
        env:
          PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
```

# Parameters

## Input

| Name | Required | Description | Default Value |
| :----: | :----: | :---- | :----: |
| action_type | `false` | Action type, preview or upload | `upload` |
| project_path | `false` | Project path, which contains project.config.json | `.` |
| page_path | `false` | Page path, one of the pages in app.json |  |
| page_query | `false` | Page query |  |
| scene | `false` | Scene code | `1011` |
| version | `false` | Publish version | `1.0.0` |
| description | `false` | Release notes |  |

## Output

| Name | Always | Description | Default Value |
| :----: | :----: | :---- | :----: |
| preview_qrcode | `false` | The base64 content of the MiniProgram to preview the QR code |  |
| preview_qrcode_path | `false` | The file path of the MiniProgram to preview the QR code |  |

# Secrets

The `PRIVATE_KEY` secret is used to authenticate with WeChat when running the `miniprogram-ci` CLI. You can find out how to create this token here on the WeChat Developers: [CI](https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html)

There are mainly the following primary steps:

1. Login to https://mp.weixin.qq.com
2. Find "开发" - "开发设置" - "小程序代码上传"
3. Generate private key and download key file, and **close IP whitelist**
4. Copy the contents of the key file and add in GitHub repository settings. Find "Settings" - "Secrets" - "Actions", and click "New repository secret" button. Enter the "Name" as `PRIVATE_KEY`, and "Secret" as the contents of the key file

# Example Use Cases

- Preview MiniProgram if the `master` branch has changed since the last build.
- Upload MiniProgram when the tag is created on GitHub.

Here is a example project [recruit-miniprogram](https://github.com/crazyurus/recruit-miniprogram/tree/master/.github/workflows)
