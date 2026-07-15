import dom from "../dom.js";
import { showToast } from "./toast.js";

export function initializeCopyButtons() {
    if (dom.copyCssBtn) {
        dom.copyCssBtn.addEventListener("click", () => {
            const cssText = dom.cssOutput.textContent;
            navigator.clipboard.writeText(cssText).then(() => {
                showToast("CSS code copied to clipboard!");
            }).catch(() => {
                showToast("Failed to copy code.", "error");
            });
        });
    }

    if (dom.copyTailwindBtn) {
        dom.copyTailwindBtn.addEventListener("click", () => {
            const tailwindText = dom.tailwindOutput.textContent;
            navigator.clipboard.writeText(tailwindText).then(() => {
                showToast("Tailwind class copied to clipboard!");
            }).catch(() => {
                showToast("Failed to copy code.", "error");
            });
        });
    }
}