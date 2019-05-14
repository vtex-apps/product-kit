export const schema = ({ showArrows, showDots, showBadge }) => {
  return {
    title: 'admin/editor.productKitList.title',
    description: 'admin/editor.productKitList.description',
    type: 'object',
    properties: {
      allowSwap: {
        type: 'boolean',
        title: 'admin/editor.productKitList.allowSwap',
        default: true,
        isLayout: false,
      },
      allowRemoval: {
        type: 'boolean',
        title: 'admin/editor.productKitList.allowRemoval',
        default: true,
        isLayout: false,
      },
      showArrows: {
        type: 'boolean',
        title: 'admin/editor.productKitList.showArrows',
        default: true,
        isLayout: true,
      },
      nextArrow: showArrows ? {
        type: 'string',
        title: 'admin/editor.productKitList.nextArrow',
        default: '',
        isLayout: false,
        widget: {
          'ui:widget': 'image-uploader',
        },
      } : {},
      prevArrow: showArrows ? {
        type: 'string',
        title: 'admin/editor.productKitList.prevArrow',
        default: '',
        isLayout: false,
        widget: {
          'ui:widget': 'image-uploader',
        },
      } : {},
      showDots: {
        type: 'boolean',
        title: 'admin/editor.productKitList.showDots',
        default: true,
        isLayout: true,
      },
      dots: showDots ? {
        type: 'string',
        title: 'admin/editor.productKitList.dot',
        default: '',
        isLayout: false,
        widget: {
          'ui:widget': 'image-uploader',
        },
      } : {},
      showListPrice: {
        type: 'boolean',
        title: 'admin/editor.productKitList.showListPrice',
        default: true,
        isLayout: true,
      },
      showLabels: {
        type: 'boolean',
        title: 'admin/editor.productKitList.showLabels',
        default: false,
        isLayout: true,
      },
      showInstallments: {
        type: 'boolean',
        title: 'admin/editor.productKitList.showInstallments',
        default: false,
        isLayout: true,
      },
      showBadge: {
        type: 'boolean',
        title: 'admin/editor.productKitList.showBadge',
        default: false,
        isLayout: true,
      },
      badgeText: showBadge
        ? {
          type: 'string',
          title: 'admin/editor.productKitList.badgeText',
          isLayout: false,
        }
        : {},
    },
  }
}
