import { ActiveToast, ToastProps, useToast as vueToast } from 'vue-toast-notification'

export function useToast() {
    const notification = vueToast()
    const config = { position: 'top-right' } as ToastProps

    const success = (message: string): ActiveToast => notification.success(message, config)
    const error = (message: string): ActiveToast => notification.error(message, config)
    const info = (message: string): ActiveToast => notification.info(message, config)
    const { clear } = notification

    return { success, error, info, clear }
}