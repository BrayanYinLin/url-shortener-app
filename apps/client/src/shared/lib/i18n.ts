/* eslint-disable prettier/prettier */
export const resource = {
  en: {
    getStarted: 'Simplify your <span class="text-turquoise-blue-600">links</span>. Expand your <span class="text-turquoise-blue-600">reach</span>.',
    starOnGithub: 'Star on Github',
    continueWithGoogle: 'Continue with Google',
    continueWithGitHub: 'Continue with GitHub',
    createShortLink: 'Create shortened link',
    shortenLink: 'Shorten link',
    createLinkError: 'Error creating link.',
    linkCreatedSuccess: 'Short link successfully created',
    confirmDeletePrompt: 'Do you want to delete',
    deleteLink: 'Delete link',
    cancel: 'Cancel',
    confirmEditPrompt: 'Edit link',
    logout: 'Logout',
    edit: 'Edit',
    linkLabel: 'Link',
    searchPlaceholder: 'Search link by short name...',
    notFound: 'Link was not found',
    backHome: 'Go Home',
    nameReserved: 'Name Reserved',
    mainTitle: 'Shorten your URL',
    expiresAfter: 'Expires after',
    description: 'Shorten your links quickly and securely. Share, manage, and analyze with a simple yet powerful tool.'
  },
  es: {
    getStarted: 'Empezar',
    starOnGithub: 'Califícame en Github',
    continueWithGoogle: 'Continuar con Google',
    continueWithGitHub: 'Continuar con GitHub',
    createShortLink: 'Crear enlace recortado',
    shortenLink: 'Recortar link',
    createLinkError: 'Error creando link',
    linkCreatedSuccess: 'Enlace recortado exitósamente',
    confirmDeletePrompt: '¿Quieres borrar',
    deleteLink: 'Eliminar enlace',
    cancel: 'Cancelar',
    confirmEditPrompt: 'Editar enlace',
    logout: 'Cerrar sesión',
    edit: 'Editar',
    linkLabel: 'Enlace',
    searchPlaceholder: 'Buscar enlace por nombre corto...',
    notFound: 'Enlace no encontrado',
    backHome: 'Ir a la raíz',
    nameReserved: 'Nombre reservado',
    mainTitle: 'Simplifica tus <span class="text-turquoise-blue-600">enlaces</span>. Amplía tu <span class="text-turquoise-blue-600">alcance</span>.',
    expiresAfter: 'Expira en',
    description: 'Acorta tus enlaces de forma rápida y segura. Comparte, gestiona y analiza con una herramienta simple pero poderosa.'
  }
}


export type Resource = typeof resource
export type Language = keyof typeof resource
export type TranslationKeys = keyof (typeof resource)['en']
