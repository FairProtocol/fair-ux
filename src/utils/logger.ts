import logdown from 'logdown'

export const getLogger = (title: string) => {
  const logger = logdown(`FAIR_PROTOCOL::${title}`)

  logger.state.isEnabled = true

  return logger
}
