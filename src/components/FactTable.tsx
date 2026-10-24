import s from './FactTable.module.css'

interface FactTableProps {
  /** `breakAnywhere` lets a long unbroken value (e.g. the CIN) wrap mid-string. */
  rows: readonly { label: string; value: string; breakAnywhere?: boolean }[]
  className?: string
}

/** Two-column key/value fact table (wireframe .fact-table). */
export function FactTable({ rows, className }: FactTableProps) {
  return (
    <table className={className ? `${s.table} ${className}` : s.table}>
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <td>{r.label}</td>
            <td className={r.breakAnywhere ? s.breakAnywhere : undefined}>{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
