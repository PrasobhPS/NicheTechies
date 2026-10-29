import { useState } from 'react';

export default function useExternalScripts() {
  const [ready] = useState(true);
  return ready;
}
