import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [{
  title: t('Items'),
  href: '/items'
}];
interface Item {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}
export default function Index({
  items,
  flash
}: {
  items: Item[];
  flash?: {
    success?: string;
  };
}) {
  const {
    delete: destroy
  } = useForm();
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const handleDelete = (item: Item) => {
    destroy(`/items/${item.id}`, {
      onSuccess: () => setItemToDelete(null)
    });
  };
  return <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Items')} />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold tracking-tight">{t('Items')}</h2>
                    <Button asChild>
                        <Link href="/items/create">{t('Create Item')}</Link>
                    </Button>
                </div>

                {flash?.success && <div className="rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {flash.success}
                    </div>}

                <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">{t('ID')}</TableHead>
                                <TableHead>{t('Name')}</TableHead>
                                <TableHead>{t('Description')}</TableHead>
                                <TableHead className="w-[200px] text-right">{t('Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.length === 0 ? <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        {t('No items found.')}
                                    </TableCell>
                                </TableRow> : items.map(item => <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.id}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.description || '-'}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/items/${item.id}/edit`}>{t('Edit')}</Link>
                                                </Button>
                                                <Dialog open={itemToDelete?.id === item.id} onOpenChange={open => !open && setItemToDelete(null)}>
                                                    <DialogTrigger asChild>
                                                        <Button variant="destructive" size="sm" onClick={() => setItemToDelete(item)}>
                                                            {t('Delete')}
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{t('Are you sure?')}</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone. This will permanently delete the item
                                                                "{item.name}".
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={() => setItemToDelete(null)}>
                                                                {t('Cancel')}
                                                            </Button>
                                                            <Button variant="destructive" onClick={() => handleDelete(item)}>
                                                                {t('Delete')}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>)}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>;
}