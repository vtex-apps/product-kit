# VTEX Product Kit

## Description
The VTEX product kit app is ... and this app is used by Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [0.x]    | **Maintenance LTS** |  2018-07-06     | 2018-11-05            | March 2019  | 1.x
| [1.x]    | **Current Release** |  2018-11-05     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage
This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app you need to add it in your `dependencies` in the `manifest.json` file.

```json
  dependencies: {
    "vtex.product-kit": "1.x"
  }
```

Then, add `product-kit` block into our app theme, as we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json). 

### Blocks API
This app has an interface that describes what rules must be implemented by a block when you want to use the product kit.

```json
"product-kit": {
    "component": "index"
  }
```

### Configuration
Through the Storefront, you can change the minicart's behavior and interface. However, you also can make in your theme app, as Dreamstore does.

| Prop name          | Type              | Description                                   |
| ------------------ | ----------------- | --------------------------------------------- |
| `showArrows`       | `Boolean`         | Show or not the arrows                        |
| `showDots`         | `String`          | Show or not the dots                          |
| `nextArrow`        | `String`          | Next arrow icon                               |
| `prevArrow`        | `String`          | Previous arrow icon                           |
| `dots`             | `String`          | Dots icon                                     |
| `showListPrice`    | `Boolean`         | Show or not the list price                    |
| `showLabel`        | `Boolean`         | Show or not the labels "from" and "to"        |
| `showInstallments` | `Boolean`         | Show or not the installments                  |
| `showBadge`        | `Boolean`         | Show or not the discount badge                |
| `badgeText`        | `String`          | Text of the discount badge                    |
| `showCollections`  | `Boolean`         | Show or not the collections badges            |
| `allowSwap`        | `Boolean`         | Allow or not the item swap                    |
| `allowRemoval`     | `Boolean`         | Allow or not the item removal                 |

### Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/product-kit/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-kit/issues/new) or contribute with pull requests.

## Tests
:construction: :construction: :construction: