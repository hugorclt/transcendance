export function getStatusFromVisibility(
  status: string,
  visibility: string,
): string {
  if (visibility == 'VISIBLE') {
    return status;
  } else if (visibility == 'AWAY') {
    return 'AWAY';
  } else if (visibility == 'INVISIBLE') {
    return 'DISCONNECTED';
  }
}
