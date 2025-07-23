/* eslint-disable prettier/prettier */
export const resource = {
  en: {
    'Get Started': 'Get Started',
    'Star on Github': 'Star on Github',
    'Continue Google': 'Continue with Google',
    'Continue GitHub': 'Continue with GitHub',
    'Create Shortened Link': 'Create shortened link',
    'Shorten': 'Shorten link',
    'Creating Link Error': 'Error creating link.',
    'New Link Confirmation': 'Short link successfully created',
    'Delete Prompt': 'Do you want to delete',
    Delete: 'Delete link',
    Cancel: 'Cancel',
    'Edit Confirmation': 'Edit link',
    'Logout': 'Logout',
    'Edit Title': 'Edit',
    'Link': 'Link',
    'Search Placeholder': 'Search link by short name...',
    'Not found': 'Link was not found',
    'Back home': 'Go Home',
    'Name Reserved': 'Name Reserved',
    'Main Title': 'Short your URL',
    'Expires after': 'Expires after '
  },
  es: {
    'Get Started': 'Empezar',
    'Star on Github': 'Califícame en Github',
    'Continue Google': 'Continuar con Google',
    'Continue GitHub': 'Continuar con GitHub',
    'Create Shortened Link': 'Crear enlace recortado',
    'Shorten': 'Recortar link',
    'Creating Link Error': 'Error creando link',
    'New Link Confirmation': 'Enlace recortado exitósamente',
    'Delete Prompt': '¿Quieres borrar ',
    Delete: 'Eliminar enlace',
    Cancel: 'Cancelar',
    'Edit Confirmation': 'Editar enlace',
    'Logout': 'Cerrar sesión',
    'Edit Title': 'Editar',
    'Link': 'Enlace',
    'Search Placeholder': 'Buscar enlace por nombre corto...',
    'Not found': 'Enlace no encontrado',
    'Back home': 'Ir a la raíz',
    'Name Reserved': 'Nombre reservado',
    'Main Title': 'Acorta tu URL',
    'Expires after': 'Expira en '
  }
}

export type Resource = typeof resource
export type Language = keyof typeof resource
export type TranslationKeys = keyof (typeof resource)['en']
