import s from './FactTable.module.css'

interface FactTableProps {
  rows: readonly { label: string; value: string }[]
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
            <td>{r.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
