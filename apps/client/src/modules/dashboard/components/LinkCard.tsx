import {
  ClickIcon,
  CopiedSuccessfullyIcon,
  CopyIcon,
  EditIcon,
  TrashIcon
} from '@/components/Icons'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'root/types'
import { DeleteModal } from './DeleteModal'
import { WEBSITE } from '@/lib/definitions'
import { EditLink } from './EditLink'
import moment from 'moment'
import { getExpirationWithTimezone } from '../lib/utils'
import { useTranslationStore } from '@/lib/stores'

export function LinkCard({ id, long, short, clicks, expires_at }: Link) {
  const { t } = useTranslationStore()
  const [copied, setCopied] = useState(false)
  const [removeModal, setRemoveModal] = useState(false)
  const [editModal, setEditModal] = useState<boolean>(false)

  const copyToClipboard = (link: string) => {
    const url = `${WEBSITE}${link}`
    navigator.clipboard.writeText(url)
    setCopied(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timer) setCopied(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [copied])

  return (
    <article className="h-32 bg-white-hue border border-slate-300 shadow-sm rounded-md p-3 flex gap-4 flex-col justify-between">
      {removeModal &&
        createPortal(
          <DeleteModal
            id={id!}
            short={short}
            close={() => setRemoveModal(false)}
          />,
          document.body
        )}
      {editModal &&
        createPortal(
          <EditLink id={id!} short={short} close={() => setEditModal(false)} />,
          document.body
        )}
      <section className="flex justify-between">
        <div className="flex flex-col w-1/2 overflow-hidden">
          <a href={long} target="_blank" className="text-base font-semibold">
            /{short}
          </a>
          <p className="text-xs font-light overflow-hidden whitespace-nowrap overflow-ellipsis">
            {long}
          </p>
        </div>

        <div className="flex gap-1 items-start">
          <button
            type="button"
            aria-label="copy icon"
            className="p-1 rounded hover:bg-slate-100 transition-all duration-200"
            onClick={() => copyToClipboard(short)}
          >
            {copied ? <CopiedSuccessfullyIcon /> : <CopyIcon />}
          </button>
          <button
            type="button"
            aria-label="edit icon"
            className="p-1 rounded hover:bg-slate-100 transition-all duration-200"
            onClick={() => setEditModal(true)}
          >
            <EditIcon />
          </button>
          <button
            type="button"
            aria-label="trash icon"
            className="p-1 rounded hover:bg-slate-100 transition-all duration-200"
            onClick={() => setRemoveModal(true)}
          >
            <TrashIcon />
          </button>
        </div>
      </section>

      <section className="flex items-center justify-between">
        <p className="flex items-center text-xs">
          <ClickIcon /> {clicks} Clicks
        </p>
        {expires_at && (
          <p className="text-xs font-medium overflow-hidden whitespace-nowrap overflow-ellipsis">
            {t('Expires after')}
            {moment(getExpirationWithTimezone(expires_at)).format(
              'YYYY-MM-DD HH:mm'
            )}
          </p>
        )}
      </section>
    </article>
  )
}
