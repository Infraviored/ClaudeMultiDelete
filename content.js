(function() {
  let isProcessing = false;

  function addCheckboxes() {
    const items = document.querySelectorAll('ul.flex.flex-col.py-1 > li:not(.button-container)');
    items.forEach((item) => {
      if (!item.querySelector('.delete-checkbox')) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'delete-checkbox';
        const groupDiv = item.querySelector('div.group.flex.items-center');
        if (groupDiv) {
          groupDiv.appendChild(checkbox);
        } else {
          item.appendChild(checkbox);
        }
        checkbox.addEventListener('change', updateButtonVisibility);
      }
    });
    addBulkSelectionFunctionality();
  }

  function addBulkSelectionFunctionality() {
    let lastChecked = null;
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('delete-checkbox')) {
        const checkbox = e.target;
        if (!lastChecked) {
          lastChecked = checkbox;
          return;
        }
        if (e.shiftKey) {
          const checkboxes = Array.from(document.querySelectorAll('.delete-checkbox'));
          const start = checkboxes.indexOf(checkbox);
          const end = checkboxes.indexOf(lastChecked);
          checkboxes.slice(Math.min(start, end), Math.max(start, end) + 1)
            .forEach(cb => cb.checked = lastChecked.checked);
        }
        lastChecked = checkbox;
        updateButtonVisibility();
      }
    });
  }

  function addButtons() {
    let buttonContainer = document.querySelector('.button-container');
    if (!buttonContainer) {
      buttonContainer = document.createElement('li');
      buttonContainer.className = 'button-container';
      buttonContainer.style.display = 'none';
      buttonContainer.style.justifyContent = 'flex-end';
      buttonContainer.style.gap = '10px';

      const deselectAllBtn = document.createElement('button');
      deselectAllBtn.textContent = 'Deselect All';
      deselectAllBtn.id = 'deselect-all-btn';
      deselectAllBtn.className = 'action-button deselect-button';

      const deleteSelectedBtn = document.createElement('button');
      deleteSelectedBtn.textContent = 'Delete Selected';
      deleteSelectedBtn.id = 'delete-selected-btn';
      deleteSelectedBtn.className = 'action-button delete-button';

      buttonContainer.appendChild(deselectAllBtn);
      buttonContainer.appendChild(deleteSelectedBtn);

      const ul = document.querySelector('ul.flex.flex-col.py-1');
      if (ul) {
        ul.appendChild(buttonContainer);
        deleteSelectedBtn.addEventListener('click', deleteSelectedItems);
        deselectAllBtn.addEventListener('click', deselectAllItems);
      }
    }
  }

  function deleteSelectedItems() {
    const checkedItems = document.querySelectorAll('.delete-checkbox:checked');
    checkedItems.forEach((checkbox) => {
      const deleteBtn = checkbox.closest('li').querySelector('button[aria-label="Remove from project knowledge"]');
      if (deleteBtn) {
        deleteBtn.click();
      }
    });
    uncheckAllCheckboxes();
    updateButtonVisibility();
  }

  function deselectAllItems() {
    uncheckAllCheckboxes();
    updateButtonVisibility();
  }

  function uncheckAllCheckboxes() {
    const checkboxes = document.querySelectorAll('.delete-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  function updateButtonVisibility() {
    const buttonContainer = document.querySelector('.button-container');
    const checkedItems = document.querySelectorAll('.delete-checkbox:checked');
    if (buttonContainer) {
      buttonContainer.style.display = checkedItems.length > 0 ? 'flex' : 'none';
    }
  }

  function init() {
    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
      if (isProcessing) return;
      isProcessing = true;
      
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          const hasRelevantChanges = addedNodes.some(node => node.nodeType === 1 && node.matches('ul.flex.flex-col.py-1, ul.flex.flex-col.py-1 *')) ||
                                     removedNodes.some(node => node.nodeType === 1 && node.matches('ul.flex.flex-col.py-1, ul.flex.flex-col.py-1 *'));
          
          if (hasRelevantChanges) {
            addCheckboxes();
            addButtons();
            updateButtonVisibility();
            break;
          }
        }
      }
      
      isProcessing = false;
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    addCheckboxes();
    addButtons();
    updateButtonVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();