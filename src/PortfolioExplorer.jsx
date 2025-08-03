import React, { useState, useEffect } from 'react';
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  List,
  ListItemButton,
  ListItemText,
  Breadcrumbs,
  Link
} from '@mui/material';

const FolderTree = ({ nodes, onSelect }) => (
  <List className="portfolio-tree">
    {nodes.map(node => (
      <ListItemButton key={node.id} onClick={() => onSelect(node)}>
        <ListItemText primary={node.name} />
      </ListItemButton>
    ))}
  </List>
);

const PortfolioExplorer = () => {
  const [tree, setTree] = useState([]);
  const [current, setCurrent] = useState(null);
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/wp-json/portfolio/v1/tree')
      .then(res => res.json())
      .then(data => {
        setTree(data);
        setCurrent({ name: 'Racine', children: data, images: [] });
        setLoading(false);
      });
  }, []);

  const openFolder = folder => {
    setPath([...path, folder]);
    setCurrent(folder);
  };

  const goTo = index => {
    const newPath = path.slice(0, index);
    const folder = index === 0 ? { name: 'Racine', children: tree, images: [] } : path[index - 1];
    setPath(newPath);
    setCurrent(folder);
  };

  if (loading) {
    return (
      <Box className="portfolio-loader">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="portfolio-app">
      <Breadcrumbs aria-label="breadcrumb" className="portfolio-breadcrumbs">
        <Link underline="hover" key="root" onClick={() => { setPath([]); setCurrent({ name: 'Racine', children: tree, images: [] }); }}>Racine</Link>
        {path.map((p, i) => (
          <Link underline="hover" key={p.id} onClick={() => goTo(i + 1)}>{p.name}</Link>
        ))}
      </Breadcrumbs>
      <Box className="portfolio-content">
        {current.children && current.children.length > 0 && (
          <FolderTree nodes={current.children} onSelect={openFolder} />
        )}
        {current.images && current.images.length > 0 && (
          <ImageList variant="masonry" cols={3} gap={8} className="portfolio-grid">
            {current.images.map(img => (
              <ImageListItem key={img.id}>
                <img src={img.thumb || img.url} alt={img.title} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Box>
  );
};

export default PortfolioExplorer;
