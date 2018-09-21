export const getSchema = ({ showBadge }) =>  {
  return {
    title: 'editor.productKit.title',
    description: 'editor.productKit.description',
    type: 'object',
    properties: {
      showListPrice: {
        type: 'boolean',
        title: 'editor.productKit.showListPrice',
        default: true,
        isLayout: true,
      },
      showLabels: {
        type: 'boolean',
        title: 'editor.productKit.showLabels',
        default: false,
        isLayout: true,
      },
      showInstallments: {
        type: 'boolean',
        title: 'editor.productKit.showInstallments',
        default: false,
        isLayout: true,
      },
      showBadge: {
        type: 'boolean',
        title: 'editor.productKit.showBadge',
        default: false,
        isLayout: true,
      },
      badgeText: showBadge
        ? {
            type: 'string',
            title: 'editor.productKit.badgeText',
            isLayout: false,
          }
        : {},
    },
  }
}
