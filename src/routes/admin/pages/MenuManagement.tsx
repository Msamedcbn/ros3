import React, { useState } from 'react';
import { CategoryList } from '../../../components/admin/menu/CategoryList';
import { MenuItemList } from '../../../components/admin/menu/MenuItemList';
import { CategoryModal } from '../../../components/admin/menu/CategoryModal';
import { MenuItemModal } from '../../../components/admin/menu/MenuItemModal';
import type { Category, MenuItem } from '../../../types/menu';

export function MenuManagement() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);

  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
    setIsAddingCategory(false);
  };

  const handleUpdateCategory = (categoryId: string, updates: Partial<Category>) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId ? { ...cat, ...updates } : cat
    ));
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
    setIsAddingMenuItem(false);
  };

  const handleUpdateMenuItem = (itemId: string, updates: Partial<MenuItem>) => {
    setMenuItems(menuItems.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ));
    setEditingMenuItem(null);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Menü Yönetimi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddCategory={() => setIsAddingCategory(true)}
            onEditCategory={setEditingCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </div>

        <div className="lg:col-span-3">
          <MenuItemList
            items={menuItems.filter(item => 
              !selectedCategory || item.categoryId === selectedCategory.id
            )}
            onAddItem={() => setIsAddingMenuItem(true)}
            onEditItem={setEditingMenuItem}
            onDeleteItem={handleDeleteMenuItem}
          />
        </div>
      </div>

      {(isAddingCategory || editingCategory) && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setIsAddingCategory(false);
            setEditingCategory(null);
          }}
          onSave={editingCategory ? handleUpdateCategory : handleAddCategory}
        />
      )}

      {(isAddingMenuItem || editingMenuItem) && (
        <MenuItemModal
          item={editingMenuItem}
          categories={categories}
          onClose={() => {
            setIsAddingMenuItem(false);
            setEditingMenuItem(null);
          }}
          onSave={editingMenuItem ? handleUpdateMenuItem : handleAddMenuItem}
        />
      )}
    </div>
  );
}