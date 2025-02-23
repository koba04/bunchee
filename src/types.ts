import type { JscTarget } from '@swc/core'
import type { InputOptions, OutputOptions, RollupOptions } from 'rollup'

type ExportType = 'require' | 'export' | 'default' | string // omit other names

// Shared config for each build entry
type CommonConfig = {
  dts?: boolean
  format?: OutputOptions['format']
  minify?: boolean
  sourcemap?: boolean
  external?: string[]
  runtime?: string

  // assigned extra config
  exportCondition?: {
    source: string // detected source file
    name: string // export condition name
    export: ExportCondition // export condition value
  }
}

type PackageMetadata = {
  name?: string
  main?: string
  module?: string
  type?: 'commonjs' | 'module'
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  peerDependenciesMeta?: Record<string, Record<string, string>>
  exports?: string | Record<string, ExportCondition>
  types?: string
  typings?: string
}

type ExportCondition = string | Record<ExportType, string>

type BuncheeRollupConfig = Partial<Omit<RollupOptions, 'input' | 'output'>> & {
  exportName?: string
  input: InputOptions
  output: OutputOptions[]
  dtsOnly: boolean
}

type CliArgs = CommonConfig & {
  file?: string
  watch?: boolean
  cwd?: string
  target?: JscTarget
}

type BundleOptions = CliArgs & {
  useTypescript: boolean
}

export type { CliArgs, ExportType, BundleOptions, ExportCondition, PackageMetadata, BuncheeRollupConfig }
