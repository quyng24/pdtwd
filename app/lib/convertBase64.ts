export function base64ToBlobUrl(base64: string) {
    const byteString = atob(base64.split(",")[1]);
    const mimeType = base64.match(/data:(.*?);base64/)?.[1] || "image/jpeg";
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeType });
    return URL.createObjectURL(blob);
}
