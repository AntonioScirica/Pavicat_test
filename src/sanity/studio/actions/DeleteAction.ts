import { TrashIcon } from '@sanity/icons'
import { useDocumentOperation, type DocumentActionComponent } from 'sanity'
import { useState, useCallback } from 'react'

export const DeleteDocumentAction: DocumentActionComponent = (props) => {
  const { delete: deleteOp } = useDocumentOperation(props.id, props.type)
  const [confirming, setConfirming] = useState(false)

  const onHandle = useCallback(() => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    deleteOp.execute()
    props.onComplete()
  }, [confirming, deleteOp, props])

  return {
    label: confirming ? 'Conferma eliminazione' : 'Elimina',
    icon: TrashIcon,
    tone: 'critical' as const,
    onHandle,
  }
}
