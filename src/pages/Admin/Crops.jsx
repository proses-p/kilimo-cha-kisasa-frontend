import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import { fetchCrops, createCrop, updateCrop, deleteCrop } from '../../services/adminApi';

export default function AdminCrops(){
    const [crops, setCrops] = useState(null);
    const [form, setForm] = useState({name:'', description:''});

    const load = () => fetchCrops().then(res=> setCrops(res.data.data)).catch(()=>{});
    useEffect(()=>{ load(); },[]);

    const handleCreate = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append('name', form.name);
        fd.append('description', form.description);
        if (form.image) fd.append('image', form.image);
        await createCrop(fd);
        setForm({name:'',description:''});
        load();
    };

    const handleDelete = (id) => { if (!confirm('Delete crop?')) return; deleteCrop(id).then(()=> load()); };

    return (
        <AdminLayout>
            <h1 style={{color:'#065f46'}}>Crops</h1>
            <form onSubmit={handleCreate} style={{marginBottom:12}}>
                <input placeholder="Name" value={form.name} onChange={e=> setForm({...form, name:e.target.value})} required />
                <input placeholder="Description" value={form.description} onChange={e=> setForm({...form, description:e.target.value})} />
                <input type="file" onChange={e=> setForm({...form, image: e.target.files[0]})} />
                <button>Create</button>
            </form>

            {!crops ? <div>Loading...</div> : (
                <div style={{display:'grid', gap:8}}>
                    {crops.data.map(c=> (
                        <div key={c.id} style={{background:'#fff', padding:8, borderRadius:6}}>
                            <div style={{fontWeight:700}}>{c.name}</div>
                            <div>{c.description}</div>
                            <div><button onClick={()=> handleDelete(c.id)}>Delete</button></div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
